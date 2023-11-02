export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      dictionary: {
        Row: {
          created_at: string
          dictionary_category_id: number
          id: number
          image: string
        }
        Insert: {
          created_at?: string
          dictionary_category_id: number
          id?: number
          image: string
        }
        Update: {
          created_at?: string
          dictionary_category_id?: number
          id?: number
          image?: string
        }
        Relationships: [
          {
            foreignKeyName: 'dictionary_dictionary_category_id_fkey'
            columns: ['dictionary_category_id']
            referencedRelation: 'dictionary_categories'
            referencedColumns: ['id']
          }
        ]
      }
      dictionary_categories: {
        Row: {
          created_at: string
          id: number
          image: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          image: string
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          image?: string
          type: string
        }
        Relationships: []
      }
      dictionary_category_details: {
        Row: {
          created_at: string
          dictionary_category_id: number
          id: number
          locale_code: string
          name: string
        }
        Insert: {
          created_at?: string
          dictionary_category_id: number
          id?: number
          locale_code: string
          name: string
        }
        Update: {
          created_at?: string
          dictionary_category_id?: number
          id?: number
          locale_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'dictionary_category_details_dictionary_category_id_fkey'
            columns: ['dictionary_category_id']
            referencedRelation: 'dictionary_categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dictionary_category_details_locale_code_fkey'
            columns: ['locale_code']
            referencedRelation: 'locales'
            referencedColumns: ['code']
          }
        ]
      }
      dictionary_details: {
        Row: {
          created_at: string
          description: string | null
          dictionary_id: number
          id: number
          locale_code: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          dictionary_id: number
          id?: number
          locale_code: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          dictionary_id?: number
          id?: number
          locale_code?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'dictionary_details_dictionary_id_fkey'
            columns: ['dictionary_id']
            referencedRelation: 'dictionary'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dictionary_details_locale_code_fkey'
            columns: ['locale_code']
            referencedRelation: 'locales'
            referencedColumns: ['code']
          }
        ]
      }
      locales: {
        Row: {
          code: string
          created_at: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          name?: string
        }
        Relationships: []
      }
      version: {
        Row: {
          created_at: string
          id: number
          version: number
        }
        Insert: {
          created_at?: string
          id?: number
          version?: number
        }
        Update: {
          created_at?: string
          id?: number
          version?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
